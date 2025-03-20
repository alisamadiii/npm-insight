"use server";

const REVALIDATE_TIME = 3600 * 24;

export async function getPackageInfo(pkg: string): Promise<{
  data?: Partial<PackageInfo>;
  error?: string;
}> {
  try {
    const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`, {
      cache: "force-cache",
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return { error: data.error };
    }

    return { data };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

export async function getDownloads(
  pkg: string,
  start: string,
  end: string
): Promise<{
  data?: {
    downloads: number;
    package: string;
    start: string;
    end: string;
  };
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg}`,
      {
        cache: "force-cache",
        next: {
          revalidate: REVALIDATE_TIME,
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return { error: data.error };
    }

    return { data };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

export async function getDownloadsRange(
  pkg: string,
  start?: string,
  end?: string
): Promise<{
  data?: {
    downloads: [
      {
        downloads: number;
        day: string;
      }
    ];
    package: string;
    start: string;
    end: string;
  };
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/range/${start}:${end}/${pkg}`,
      {
        cache: "force-cache",
        next: {
          revalidate: REVALIDATE_TIME,
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return { error: data.error };
    }

    return { data };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}
