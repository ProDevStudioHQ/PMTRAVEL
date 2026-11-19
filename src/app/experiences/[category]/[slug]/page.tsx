import type { Metadata } from "next";
import { ProgrammeRoute, programmeMetadata, programmeStaticParams } from "@/features/cms/ProgrammeRoute";

/** Programmes published after the deploy render on first request, then stay cached until the CRM revalidates them. */
export const dynamicParams = true;

export function generateStaticParams() {
  return programmeStaticParams("experiences");
}

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return programmeMetadata("experiences", (await params).slug);
}

export default async function Page({ params }: Props) {
  const { category, slug } = await params;
  return <ProgrammeRoute sectionKey="experiences" category={category} slug={slug} />;
}
