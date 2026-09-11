/** Resolve a site-local path under the current deployment base. */
export function sitePath(path = ""): string {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    return `${base}/${path.replace(/^\.?\//, "")}`;
}

/** Remove the deployment prefix before resolving a production canonical URL. */
export function canonicalPath(pathname: string): string {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
        return pathname.slice(base.length) || "/";
    }
    return pathname;
}
