import { NextRequest, NextResponse } from 'next/server';
import { MoodleApiResponse } from '@/types/moodle';

// Mock implementation of mod_forum_get_forums_by_courses
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wstoken = searchParams.get('wstoken');
  const courseids = searchParams.get('courseids');
  
  if (!wstoken) {
    return NextResponse.json({
      exception: {
        message: 'Invalid token',
        errorcode: 'invalidtoken'
      }
    }, { status: 401 });
  }

  try {
    const mockForums = await import('../../../../../../../mocks/forums.json');
    let forums = mockForums.forums;

    // Filter by course IDs if provided
    if (courseids) {
      const courseIdArray = courseids.split(',');
      forums = forums.filter(forum => 
        forum.courseId && courseIdArray.includes(forum.courseId)
      );
    }

    // Transform to Moodle format
    const moodleForums = forums.map((forum, index) => ({
      id: index + 1,
      course: forum.courseId ? parseInt(forum.courseId.replace(/\D/g, '')) : 0,
      type: 'general',
      name: forum.title,
      intro: forum.description,
      introformat: 1,
      duedate: 0,
      cutoffdate: 0,
      assessed: 0,
      assesstimestart: 0,
      assesstimefinish: 0,
      scale: 0,
      maxbytes: 0,
      maxattachments: 5,
      forcesubscribe: 0,
      trackingtype: 1,
      rsstype: 0,
      rssarticles: 0,
      timemodified: Math.floor(new Date(forum.lastActivity).getTime() / 1000),
      warnafter: 0,
      blockafter: 0,
      blockperiod: 0,
      completiondiscussions: 0,
      completionreplies: 0,
      completionposts: 0,
      cmid: index + 100,
      numdiscussions: forum.totalThreads,
      cancreatediscussions: true,
      lockdiscussionafter: 0,
      istracked: true
    }));

    const response: MoodleApiResponse<any[]> = {
      data: moodleForums
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      exception: {
        message: 'Failed to load forums',
        errorcode: 'servererror'
      }
    }, { status: 500 });
  }
}

// Mock implementation of mod_forum_get_forum_discussions
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { wstoken, forumid, sortby, sortdirection, page, perpage } = body;
  
  if (!wstoken) {
    return NextResponse.json({
      exception: {
        message: 'Invalid token',
        errorcode: 'invalidtoken'
      }
    }, { status: 401 });
  }

  try {
    const mockForums = await import('../../../../../../../mocks/forums.json');
    
    // Find the forum
    const forum = mockForums.forums.find(f => f.id === `F${forumid.toString().padStart(3, '0')}`);
    if (!forum) {
      return NextResponse.json({
        exception: {
          message: 'Forum not found',
          errorcode: 'forumnotfound'
        }
      }, { status: 404 });
    }

    // Transform threads to Moodle discussion format
    const discussions = forum.threads.map((thread, index) => ({
      id: index + 1,
      name: thread.title,
      firstpost: index + 1,
      userid: parseInt(thread.author.id.replace(/\D/g, '')),
      groupid: 0,
      assessed: false,
      timemodified: Math.floor(new Date(thread.lastReply).getTime() / 1000),
      usermodified: parseInt(thread.author.id.replace(/\D/g, '')),
      timestart: 0,
      timeend: 0,
      discussion: index + 1,
      parent: 0,
      created: Math.floor(new Date(thread.createdAt).getTime() / 1000),
      modified: Math.floor(new Date(thread.lastReply).getTime() / 1000),
      mailed: false,
      subject: thread.title,
      message: thread.content,
      messageformat: 1,
      messagetrust: 0,
      attachment: (thread as any).attachments ? '1' : '0',
      totalscore: 0,
      mailnow: 0,
      userfullname: thread.author.name,
      usermodifiedfullname: thread.author.name,
      userpictureurl: thread.author.avatar,
      usermodifiedpictureurl: thread.author.avatar,
      numreplies: thread.replies,
      numunread: 0,
      pinned: (thread as any).pinned || false,
      locked: false,
      starred: false,
      canreply: true,
      canlock: thread.author.role === 'instructor',
      canfavourite: true
    }));

    // Apply pagination
    const startIndex = (page || 0) * (perpage || 10);
    const endIndex = startIndex + (perpage || 10);
    const paginatedDiscussions = discussions.slice(startIndex, endIndex);

    const response: MoodleApiResponse<any> = {
      data: {
        discussions: paginatedDiscussions,
        warnings: []
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      exception: {
        message: 'Failed to load discussions',
        errorcode: 'servererror'
      }
    }, { status: 500 });
  }
}