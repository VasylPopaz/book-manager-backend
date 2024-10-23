const { PING_URL, PING_INTERVAL } = process.env;

export const pingService = async () => {
  try {
    const response = await fetch(`${PING_URL}/ping`);
    if (response.ok) {
      console.log("Ping successful:", await response.json());
    } else {
      console.error("Ping returned an error:", response.status);
    }
  } catch (error) {
    console.error("Error during ping:", error.message);
  }
};

const pingInterval = PING_INTERVAL * 60000;

setInterval(pingService, pingInterval);
