import { notFound } from "next/navigation";
import CloudComputingCurriculumPage from "@/app/curriculums/cloud-computing";
import FrontierLLMCurriculumPage from "@/app/curriculums/frontier-llm";
import GraphCurriculumPage from "@/app/curriculums/graph-engineeering";

const supportedCurricula = {
  "cloud-computing": CloudComputingCurriculumPage,
  "frontier-llm": FrontierLLMCurriculumPage,
  "graph-engineering": GraphCurriculumPage,
} as const;

export default async function CurriculumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const CurriculumComponent = supportedCurricula[slug as keyof typeof supportedCurricula];

  if (!CurriculumComponent) {
    notFound();
  }

  return <CurriculumComponent />;
}
