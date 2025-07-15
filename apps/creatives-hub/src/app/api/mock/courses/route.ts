import { NextRequest, NextResponse } from 'next/server';
import { MoodleApiResponse, CreativeCourse } from '@/types/moodle';

// Mock implementation of core_course_get_courses
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wstoken = searchParams.get('wstoken');
  const wsfunction = searchParams.get('wsfunction');
  
  // Simulate token validation
  if (!wstoken || wstoken === 'invalid') {
    return NextResponse.json({
      exception: {
        message: 'Invalid token',
        errorcode: 'invalidtoken'
      }
    }, { status: 401 });
  }

  // Load mock data
  try {
    const mockCourses = await import('../../../../../../../mocks/creative-courses.json');
    const courses: CreativeCourse[] = mockCourses.creativeCourses.map(course => ({
      ...course,
      nextDeadline: course.nextDeadline || undefined,
      assignments: course.assignments.map(assignment => ({
        ...assignment,
        status: assignment.status as 'pending' | 'in_progress' | 'submitted' | 'completed'
      })),
      fullname: course.title,
      shortname: course.id,
      categoryid: 1,
      categorypathname: course.department,
      summary: course.description,
      summaryformat: 1,
      showgrades: true,
      newsitems: 5,
      startdate: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60), // 30 days ago
      enddate: Math.floor(Date.now() / 1000) + (60 * 24 * 60 * 60), // 60 days from now
      numsections: 10,
      maxbytes: 0,
      showreports: false,
      visible: true,
      hiddensections: 0,
      groupmode: 0,
      groupmodeforce: 0,
      defaultgroupingid: 0,
      timecreated: Math.floor(Date.now() / 1000) - (90 * 24 * 60 * 60),
      timemodified: Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60),
      enablecompletion: true,
      completionnotify: false,
      lang: 'en',
      forcetheme: '',
      courseformatoptions: []
    }));

    const response: MoodleApiResponse<CreativeCourse[]> = {
      data: courses,
      warnings: []
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      exception: {
        message: 'Failed to load courses',
        errorcode: 'servererror'
      }
    }, { status: 500 });
  }
}

// Mock implementation of core_course_get_enrolled_courses_by_timeline_classification
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { wstoken, classification } = body;
  
  if (!wstoken) {
    return NextResponse.json({
      exception: {
        message: 'Invalid token',
        errorcode: 'invalidtoken'
      }
    }, { status: 401 });
  }

  try {
    const mockCourses = await import('../../../../../../../mocks/creative-courses.json');
    let filteredCourses = mockCourses.creativeCourses;

    // Filter based on classification (inprogress, future, past)
    if (classification === 'inprogress') {
      filteredCourses = filteredCourses.filter(course => course.enrolled && course.progress < 100);
    } else if (classification === 'future') {
      filteredCourses = filteredCourses.filter(course => !course.enrolled);
    } else if (classification === 'past') {
      filteredCourses = filteredCourses.filter(course => course.progress === 100);
    }

    const response: MoodleApiResponse<any> = {
      data: {
        courses: filteredCourses,
        nextoffset: 0
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      exception: {
        message: 'Failed to load courses',
        errorcode: 'servererror'
      }
    }, { status: 500 });
  }
}