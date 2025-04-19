
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Book, UserCircle, Clock, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserCourses } from "@/services/userCourseService";
import { signOut } from "@/services/userService";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const { user, isAdmin, isPaidUser, checkingSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!checkingSession && !user) {
      navigate("/auth");
    }
  }, [user, checkingSession, navigate]);
  
  const { data: userCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ["userCourses"],
    queryFn: getUserCourses,
    enabled: !!user
  });
  
  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast({
        title: "התנתקת בהצלחה",
        description: "מקווים לראות אותך שוב בקרוב!",
      });
      navigate("/");
    } else {
      toast({
        title: "שגיאה בהתנתקות",
        description: result.message,
        variant: "destructive"
      });
    }
  };
  
  if (checkingSession) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null; // We'll redirect in useEffect
  }
  
  const getUserRoleBadge = () => {
    if (isAdmin) {
      return <Badge variant="outline" className="bg-purple-100 text-purple-800">מנהל</Badge>;
    } else if (isPaidUser) {
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">משתמש משלם</Badge>;
    } else {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">משתמש חינמי</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">האזור האישי שלי</h1>
          {isAdmin && (
            <Button asChild variant="outline">
              <a href="/course-admin">
                <Settings className="ml-2 h-4 w-4" />
                ניהול קורסים
              </a>
            </Button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Info Card */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">{user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user.full_name || "משתמש"}</CardTitle>
                <CardDescription className="text-sm break-words">{user.email}</CardDescription>
                <div className="mt-2">{getUserRoleBadge()}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>נרשם בתאריך: {formatDate(user.created_at)}</p>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleSignOut}>התנתק</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:w-2/3">
            <Tabs defaultValue="courses">
              <TabsList className="mb-4">
                <TabsTrigger value="courses" className="flex items-center">
                  <Book className="ml-2 h-4 w-4" />
                  הקורסים שלי
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center">
                  <UserCircle className="ml-2 h-4 w-4" />
                  פרטי חשבון
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>הקורסים שלי</CardTitle>
                    <CardDescription>הקורסים שרכשת</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {coursesLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : userCourses && userCourses.length > 0 ? (
                      <div className="grid gap-4">
                        {userCourses.map((userCourse) => (
                          <Card key={userCourse.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              {userCourse.course?.image_url && (
                                <div className="md:w-1/4 h-32 md:h-auto">
                                  <img 
                                    src={userCourse.course.image_url} 
                                    alt={userCourse.course.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-4 md:w-3/4">
                                <h3 className="text-lg font-medium">{userCourse.course?.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                  {userCourse.course?.description}
                                </p>
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                  <Clock className="ml-2 h-4 w-4" />
                                  <span>נרכש בתאריך: {formatDate(userCourse.granted_at)}</span>
                                </div>
                                <div className="mt-4">
                                  <Button asChild size="sm">
                                    <a href={`/digital-courses/${userCourse.course?.slug}`}>
                                      המשך לקורס
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-muted/50 rounded-lg">
                        <Book className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                        <h3 className="text-xl font-medium mb-2">עדיין אין לך קורסים</h3>
                        <p className="text-muted-foreground mb-4">
                          עדיין לא רכשת קורסים. גלה את הקורסים שלנו והתחל ללמוד היום!
                        </p>
                        <Button asChild>
                          <a href="/digital-courses">
                            לחץ לצפייה בקורסים
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>פרטי חשבון</CardTitle>
                    <CardDescription>צפה בפרטי החשבון שלך</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">שם מלא</h3>
                        <p>{user.full_name || "לא צוין"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">כתובת אימייל</h3>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">סוג חשבון</h3>
                        <p>{getUserRoleBadge()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">תאריך הצטרפות</h3>
                        <p>{formatDate(user.created_at)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
