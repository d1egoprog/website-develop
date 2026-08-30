import fs from "node:fs";
import path from "node:path";
import bibtexParse from "bibtex-parse";

export type PublicationType =
  | "article"
  | "inproceedings"
  | "incollection"
  | "book"
  | "inbook"
  | "phdthesis"
  | "mastersthesis"
  | "techreport"
  | "misc"
  | "unknown";

export interface PublicationAuthor {
  firstName?: string;
  lastName?: string;
  fullName: string;
}

export interface Publication {
  id: string;
  type: PublicationType;
  title: string;
  authors: PublicationAuthor[];
  year?: number;
  journal?: string;
  booktitle?: string;
  publisher?: string;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  url?: string;
  abstract?: string;
  keywords?: string[];
  pdf?: string;
  openAccess?: boolean;
  organization?: string;
  address?: string;
  isbn?: string;
  issn?: string;
  note?: string;
  bibtex: Record<string, string>;
}

const BIB_PATH = path.resolve(
  process.cwd(),
  "src/content/publications.bib"
);

function normalizeDOI(doi?: string): string | undefined {
  if (!doi) return undefined;

  return doi
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:/i, "")
    .trim()
    .toLowerCase();
}

function clean(value?: string | null): string | undefined {
  if (!value) return undefined;

  return value
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getBibtexField(
  fields: Record<string, any> | undefined,
  key: string
): string | undefined {
  if (!fields) return undefined;

  const field = fields[key];

  if (!field) return undefined;

  if (typeof field === "string") {
    return clean(field);
  }

  if (typeof field === "object" && "value" in field) {
    return clean(String(field.value));
  }

  return clean(String(field));
}

function parseAuthors(value?: string): PublicationAuthor[] {
  if (!value) return [];

  return value
    .split(/\s+(?:and|;)\s+/i)
    .map((author) => author.trim())
    .filter(Boolean)
    .map((author) => {
      if (author.includes(",")) {
        const [lastName, firstName] = author
          .split(",")
          .map((part) => clean(part));

        return {
          firstName,
          lastName,
          fullName: [firstName, lastName]
            .filter(Boolean)
            .join(" "),
        };
      }

      const parts = author.split(/\s+/);

      if (parts.length === 1) {
        return {
          fullName: parts[0],
        };
      }

      const lastName = parts.pop();
      const firstName = parts.join(" ");

      return {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
      };
    });
}

function normalizeType(type?: string): PublicationType {
  if (!type) return "unknown";

  const normalized = type.toLowerCase();
  const validTypes: PublicationType[] = [
    "article",
    "inproceedings",
    "incollection",
    "book",
    "inbook",
    "phdthesis",
    "mastersthesis",
    "techreport",
    "misc",
  ];

  return validTypes.includes(normalized as PublicationType)
    ? (normalized as PublicationType)
    : "unknown";
}

function normalizePublication(entry: any): Publication {
  const fields = entry.properties ?? entry.fields ?? {};
  const id = entry.id ?? entry.key ?? entry.citationKey;

  if (!id) {
    throw new Error("Publication has no BibTeX citation key.");
  }

  const title = clean(getBibtexField(fields, "title"));

  if (!title) {
    throw new Error(`Publication "${id}" has no title.`);
  }

  const yearValue = clean(getBibtexField(fields, "year"));
  const year = yearValue ? Number.parseInt(yearValue, 10) : undefined;

  const bibtex: Record<string, string> = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      if (value && typeof value === "object" && "value" in value) {
        return [key, String(value.value)];
      }

      return [key, String(value ?? "")];
    })
  );

  return {
    id,
    type: normalizeType(entry.type ?? entry.entryType),
    title,
    authors: parseAuthors(getBibtexField(fields, "author")),
    year: year && !Number.isNaN(year) ? year : undefined,
    journal: clean(getBibtexField(fields, "journal")),
    booktitle: clean(getBibtexField(fields, "booktitle")),
    publisher: clean(getBibtexField(fields, "publisher")),
    volume: clean(getBibtexField(fields, "volume")),
    number: clean(getBibtexField(fields, "number") ?? getBibtexField(fields, "issue")),
    pages: clean(getBibtexField(fields, "pages")),
    doi: normalizeDOI(clean(getBibtexField(fields, "doi"))),
    url: clean(getBibtexField(fields, "url")),
    abstract: clean(getBibtexField(fields, "abstract")),
    keywords: getBibtexField(fields, "keywords")
      ? getBibtexField(fields, "keywords")
          ?.split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean)
      : undefined,
    pdf: clean(getBibtexField(fields, "pdf")),
    openAccess:
      getBibtexField(fields, "openaccess") !== undefined
        ? String(getBibtexField(fields, "openaccess") ?? "").toLowerCase() === "true"
        : undefined,
    organization: clean(getBibtexField(fields, "organization")),
    address: clean(getBibtexField(fields, "address")),
    isbn: clean(getBibtexField(fields, "isbn")),
    issn: clean(getBibtexField(fields, "issn")),
    note: clean(getBibtexField(fields, "note")),
    bibtex,
  };
}

export function loadPublications(): Publication[] {
  if (!fs.existsSync(BIB_PATH)) {
    throw new Error(`BibTeX file not found: ${BIB_PATH}`);
  }

  const bibtex = fs.readFileSync(BIB_PATH, "utf-8");
  const parsed = bibtexParse.parse(bibtex);
  const entries = Array.isArray(parsed) ? parsed : parsed.entries ?? [];

  const uniqueEntries = new Map<string, Publication>();

  for (const entry of entries) {
    const publication = normalizePublication(entry);
    if (!uniqueEntries.has(publication.id)) {
      uniqueEntries.set(publication.id, publication);
    }
  }

  return [...uniqueEntries.values()].sort((a, b) => {
    const yearA = a.year ?? 0;
    const yearB = b.year ?? 0;
    return yearB - yearA;
  });
}

export const publications = loadPublications();

export function getPublication(id: string): Publication | undefined {
  return publications.find((publication) => publication.id === id);
}

export function getPublicationsByYear(year: number): Publication[] {
  return publications.filter((publication) => publication.year === year);
}

export function getPublicationsByType(type: PublicationType): Publication[] {
  return publications.filter((publication) => publication.type === type);
}

export function getPublicationYears(): number[] {
  return [
    ...new Set(
      publications
        .map((publication) => publication.year)
        .filter((year): year is number => year !== undefined)
    ),
  ].sort((a, b) => b - a);
}
