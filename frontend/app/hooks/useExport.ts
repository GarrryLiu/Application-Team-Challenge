"use client";

import { useState } from "react";
import { trpc } from "../utils/trpc";

// Generic function to download JSON data as a file
const downloadJson = (data: any, filename: string) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", filename);
  linkElement.style.display = "none";
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
};

// Hook for exporting all participants
export const useExportAllParticipants = () => {
  const [isExporting, setIsExporting] = useState(false);

  // Get the tRPC client directly
  const trpcClient = trpc.useContext();

  const exportAll = async () => {
    if (isExporting) {
      console.log("Export all already in progress, ignoring request");
      return;
    }

    console.log("=============== EXPORT ALL STARTED ===============");
    console.log("Exporting data for all participants");

    try {
      setIsExporting(true);
      console.log("Making direct call to export all participants");

      // Direct call to the API instead of using refetch
      const data = await trpcClient.client.participant.exportAll.query();

      if (data) {
        console.log("Successfully received all participants data");

        const filename = `all_participants_${new Date().toISOString().slice(0, 10)}.json`;
        console.log(`Downloading with filename: ${filename}`);

        downloadJson(data, filename);
        console.log("Download initiated");
      } else {
        console.error("❌ No data received for all participants export");
      }
    } catch (error) {
      console.error("❌ Error exporting all participants:", error);
    } finally {
      console.log("Export process completed, resetting state");
      setIsExporting(false);
    }

    console.log("=============== EXPORT ALL COMPLETED ===============");
  };

  return { exportAll, isExporting };
};

// Hook for exporting a single participant
export const useExportParticipantById = () => {
  const [isExporting, setIsExporting] = useState(false);

  // Get the tRPC client directly
  const trpcClient = trpc.useContext();

  const exportById = async (id: string, name: string) => {
    if (isExporting) {
      console.log("Export already in progress, ignoring request");
      return;
    }

    if (!id) {
      console.error("❌ Cannot export: No participant ID provided");
      return;
    }

    console.log("=============== EXPORT BY ID STARTED ===============");
    console.log(
      `Exporting individual participant with ID: ${id}, name: ${name}`,
    );

    try {
      setIsExporting(true);
      console.log("Making direct call to export participant by ID");

      // Direct call to the API with the ID parameter
      const data = await trpcClient.client.participant.exportById.query({ id });

      if (data) {
        console.log("Successfully received participant data to export");

        // Create a clear filename with the participant's name and ID
        const filename = `individual_participant_${id}_${name.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.json`;
        console.log(`Downloading with filename: ${filename}`);

        downloadJson(data, filename);
        console.log("Download initiated");
      } else {
        console.error("❌ No data received for individual participant export");
      }
    } catch (error) {
      console.error(`❌ Error exporting participant ${id}:`, error);
    } finally {
      console.log("Export process completed, resetting state");
      setIsExporting(false);
    }

    console.log("=============== EXPORT BY ID COMPLETED ===============");
  };

  return { exportById, isExporting };
};
