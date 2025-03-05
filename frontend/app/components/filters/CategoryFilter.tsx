"use client";

import React from "react";
import { useParticipants } from "../../context/ParticipantContext";

// Disease categories based on ICD-10 chapters
const DISEASE_CATEGORIES = [
  { value: "infectious", label: "A00-B99 Infectious & Parasitic Diseases" },
  { value: "malignancy", label: "C00-D48 Neoplasms, Malignancy" },
  { value: "hematologic", label: "D50-D89 Hematologic & Immune Disorders" },
  { value: "endocrine", label: "E00-E90 Endocrine, Metabolic" },
  { value: "mental", label: "F00-F99 Mental & Behavioral Disorders" },
  { value: "neurological", label: "G00-G99 Neurological Disorders" },
  { value: "ophthalmological", label: "H00-H59 Ophthalmological Disorders" },
  { value: "otological", label: "H60-H95 Otological Disorders" },
  { value: "cardiovascular", label: "I00-I99 Cardiovascular Diseases" },
  { value: "respiratory", label: "J00-J99 Respiratory Diseases" },
  { value: "digestive", label: "K00-K93 Digestive Disorders" },
  { value: "dermatological", label: "L00-L99 Dermatological Diseases" },
  { value: "musculoskeletal", label: "M00-M99 Musculoskeletal Disorders" },
  { value: "urogenital", label: "N00-N99 Urogenital Diseases" },
  { value: "pregnancy", label: "O00-O99 Pregnancy & Perinatal Conditions" },
  { value: "perinatal", label: "P00-P96 Perinatal & Neonatal Conditions" },
  { value: "congenital", label: "Q00-Q99 Congenital Malformations" },
  { value: "symptoms", label: "R00-R99 Symptoms & Abnormal Clinical Findings" },
  { value: "injury", label: "S00-T98 Injury, Poisoning & External Causes" },
  {
    value: "external",
    label: "V00-Y99 External Causes of Morbidity & Mortality",
  },
  {
    value: "factors",
    label: "Z00-Z99 Factors Influencing Health Status & Preventive Medicine",
  },
];

const CategoryFilter: React.FC = () => {
  const { diseaseCategoryFilter, setDiseaseCategoryFilter } = useParticipants();

  return (
    <select
      value={diseaseCategoryFilter}
      onChange={(e) => setDiseaseCategoryFilter(e.target.value)}
      style={{
        marginLeft: "8px",
        padding: "6px 10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        background: "#F1F2F3",
        cursor: "pointer",
        fontSize: "14px",
        width: "220px", // Fixed width for consistency
        display: "inline-block", // Ensure it's displayed inline
      }}
    >
      <option value="">ICD-10 Disease Categories</option>
      {DISEASE_CATEGORIES.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
