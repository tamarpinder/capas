import { NextRequest, NextResponse } from 'next/server';
import { MoodleApiResponse, StudentSubmission } from '@/types/moodle';

// Mock implementation for student submissions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wstoken = searchParams.get('wstoken');
  const courseId = searchParams.get('courseid');
  
  if (!wstoken) {
    return NextResponse.json({
      exception: {
        message: 'Invalid token',
        errorcode: 'invalidtoken'
      }
    }, { status: 401 });
  }

  try {
    const mockSubmissions = await import('../../../../../../../mocks/student-submissions.json');
    let submissions = mockSubmissions.submissions;

    // Filter by course ID if provided
    if (courseId) {
      submissions = submissions.filter(sub => sub.courseId === courseId);
    }

    const response: MoodleApiResponse<StudentSubmission[]> = {
      data: submissions
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({
      exception: {
        message: 'Failed to load submissions',
        errorcode: 'servererror'
      }
    }, { status: 500 });
  }
}