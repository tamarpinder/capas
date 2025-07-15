import { notFound } from 'next/navigation';
import programsData from '../../../../mocks/programs.json';
import ProgramClient from './ProgramClient.tsx';

interface ProgramPageProps {
  params: { slug: string };
}

export default function ProgramPage({ params }: ProgramPageProps) {
  // Server-side logic
  const foundProgram = programsData.programs.find(p => p.slug === params.slug);
  if (!foundProgram) {
    notFound();
  }

  const related = programsData.programs
    .filter(p => p.category === foundProgram.category && p.id !== foundProgram.id)
    .slice(0, 3);

  return <ProgramClient program={foundProgram} relatedPrograms={related} params={params} />;
}

export function generateStaticParams() {
  return programsData.programs.map((program) => ({
    slug: program.slug,
  }));
}