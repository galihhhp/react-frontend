let config: { apiUrl: string } | null = null;

export const loadConfig = async (): Promise<{ apiUrl: string }> => {
  if (config !== null) return config as { apiUrl: string };

  try {
    const response = await fetch("/config.json");
    config = await response.json();
    return config as { apiUrl: string };
  } catch (error) {
    config = { apiUrl: "http://localhost:3000" };
    return config;
  }
};
