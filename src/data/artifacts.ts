// Curated from public repository READMEs on 2026-09-11.
// Selection is based on research relevance and a concrete reusable deliverable; no fixed count.
// Includes original research, reproducibility resources, templates, and clearly attributed packaging.
// Categories describe the deliverable, not a claim about production readiness.
export const artifacts = [
    {
        title: "Text2KG",
        owner: "d1egoprog",
        kind: "Docker services · Knowledge Graphs",
        categories: ["software"],
        icon: "fa-solid fa-diagram-project",
        description: "A Docker-based pipeline that extracts RDF triples from prose and exposes Knowledge Graph construction services through REST APIs, with example notebooks.",
        repository: "https://github.com/d1egoprog/Text2KG",
        reference: { label: "Paper", url: "https://ceur-ws.org/Vol-3184/TEXT2KG_Paper_7.pdf" },
    },
    {
        title: "SAC2KG",
        owner: "d1egoprog",
        kind: "Python library · Seismic data",
        categories: ["software"],
        icon: "fa-solid fa-wave-square",
        description: "A Python library and command-line interface for converting seismic traces into RDF Knowledge Graphs using the Volcano Event Ontology.",
        repository: "https://github.com/d1egoprog/SAC2KG",
    },
    {
        title: "Volcano Event Ontology",
        owner: "RYFoR",
        kind: "Ontology · Semantic interoperability",
        categories: ["ontologies"],
        icon: "fa-solid fa-mountain",
        description: "VEO models seismic and volcanic events, sensor measurements, locations, and time using SOSA, GEO, and TIME vocabularies.",
        repository: "https://github.com/RYFoR/VEO",
        reference: { label: "Paper", url: "https://doi.org/10.1109/JIOT.2022.3148786" },
    },
    {
        title: "Wikidata-Flashback",
        owner: "RYFoR",
        kind: "Extraction framework · Temporal KGs",
        categories: ["software", "data"],
        icon: "fa-solid fa-clock-rotate-left",
        description: "Reconstructs point-in-time Wikidata snapshots from revision histories, with a DuckDB-based pipeline for tracking added and removed triples.",
        repository: "https://github.com/RYFoR/Wikidata-Flashback",
    },
    {
        title: "VOICES Funeral Entries",
        owner: "RYFoR",
        kind: "Data and notebooks · Digital humanities",
        categories: ["data"],
        icon: "fa-solid fa-book-open",
        description: "Data, annotations, and notebooks for evaluating handwriting recognition and named entity extraction in historical Irish Funeral Entries, supporting research on women's histories.",
        repository: "https://github.com/RYFoR/VOICES-FuneralEntries-NER",
        reference: { label: "Paper", url: "https://doi.org/10.5334/johd.491" },
    },
    {
        title: "sKGlable-VEO",
        owner: "d1egoprog",
        kind: "Research prototype · Neuro-Symbolic AI",
        categories: ["software"],
        icon: "fa-solid fa-wave-square",
        description: "A Docker-orchestrated seismic event prototype combining VEO Knowledge Graph construction, neural-network training, and event classification and annotation.",
        repository: "https://github.com/d1egoprog/sKGlable-VEO",
        reference: { label: "Paper", url: "https://doi.org/10.1007/978-3-031-99554-5_20" },
    },
    {
        title: "FAIR Dataset Template",
        owner: "RYFoR",
        kind: "Reusable template · Research data",
        categories: ["data"],
        icon: "fa-solid fa-table",
        description: "A starting structure for documenting scientific datasets, with metadata, codebook, methodology, citation, and FAIR-statement guidance to adapt to each dataset.",
        repository: "https://github.com/RYFoR/dataset-template"
    },
    {
        title: "Ontology Template",
        owner: "RYFoR",
        kind: "Reusable template · Ontology documentation",
        categories: ["ontologies"],
        icon: "fa-solid fa-sitemap",
        description: "A generic example for organizing and documenting ontology repositories, with sample RDF/OWL content and sections to customize for a domain model.",
        repository: "https://github.com/RYFoR/ontology-template"
    },
    {
        title: "WebVOWL Docker",
        owner: "d1egoprog",
        kind: "Docker packaging · Ontology visualization",
        categories: ["software"],
        icon: "fa-brands fa-docker",
        description: "A custom Docker distribution of the third-party WebVOWL visualization tool, with deployment instructions for use by individual researchers and small teams.",
        repository: "https://github.com/d1egoprog/docker-webvowl"
    },
];
