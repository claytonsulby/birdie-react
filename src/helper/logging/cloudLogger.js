// cloudLogger.js

// Imports the Google Cloud client library
const { Logging } = require("@google-cloud/logging");

/**
 * Logs an error message to Google Cloud Logging.
 * @param {Error} error - The error object or message to log.
 * @param {string} severity - The severity level (e.g., 'ERROR', 'INFO', 'WARNING').
 */
async function logToCloud(
  error,
  severity = "ERROR",
  projectId = "birdie-441217", // Your Google Cloud Platform project ID
  logName = "my-log" // The name of the log to write to
) {
  // Creates a client
  const logging = new Logging({ projectId });

  // Selects the log to write to
  const log = logging.log(logName);

  // The metadata associated with the entry
  const metadata = {
    resource: { type: "global" },
    // See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
    severity: severity,
  };

  // Format the error message as a structured log entry
  const entry = log.entry(metadata, { message: error.toString() });

  try {
    // Write the log entry to Google Cloud Logging
    await log.write(entry);
    console.log(`Logged to Google Cloud: ${severity} - ${error.toString()}`);
  } catch (writeErr) {
    console.error("Failed to log to Google Cloud:", writeErr);
  }
}

module.exports = { logToCloud };
