import { NextRequest, NextResponse } from 'next/server';
import { MoodleApiResponse } from '@/types/moodle';

// Mock implementation for course content
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wstoken = searchParams.get('wstoken');
  const courseid = searchParams.get('courseid');
  
  if (!wstoken) {
    return NextResponse.json({
      exception: {
        message: 'Invalid token',
        errorcode: 'invalidtoken'
      }
    }, { status: 401 });
  }

  if (!courseid) {
    return NextResponse.json({
      exception: {
        message: 'Course ID required',
        errorcode: 'missingparam'
      }
    }, { status: 400 });
  }

  try {
    const courseContent = await import('../../../../../../../mocks/course-content.json');
    const content = courseContent.courseContent[courseid as keyof typeof courseContent.courseContent];

    if (!content) {
      return NextResponse.json({
        exception: {
          message: 'Course not found',
          errorcode: 'coursenotfound'
        }
      }, { status: 404 });
    }

    const response: MoodleApiResponse<any> = {
      data: content
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      exception: {
        message: 'Failed to load course content',
        errorcode: 'servererror'
      }
    }, { status: 500 });
  }
}