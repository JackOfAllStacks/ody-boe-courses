import { notFound, redirect } from "next/navigation";
import {
  deriveCourseSections,
  getCourseBySlug,
  isCourseVisible,
} from "@/lib/courses";

type CourseSlugPageProps = {
  params: Promise<{ slug: string }>;
};

const CourseSlugPage = async ({ params }: CourseSlugPageProps) => {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course || !isCourseVisible(slug)) {
    notFound();
  }

  const sections = deriveCourseSections(course.blocks);
  if (!sections.length) {
    notFound();
  }

  redirect(`/courses/${slug}/${sections[0].id}`);
};

export default CourseSlugPage;
