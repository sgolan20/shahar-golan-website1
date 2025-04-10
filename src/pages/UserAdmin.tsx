
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { UserCheck, UserX, RefreshCw } from "lucide-react";
import { getAllUsers, setUserRole } from "@/services/userService";
import { UserProfile, UserRole } from "@/lib/models/User";

const UserAdmin = () => {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("free");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: getAllUsers
  });

  const setRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) => 
      setUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      setIsRoleDialogOpen(false);
      setSelectedUser(null);
      toast({
        title: "תפקיד עודכן בהצלחה",
        description: `תפקיד המשתמש עודכן ל-${getRoleDisplayName(selectedRole)}.`
      });
    },
    onError: (error) => {
      toast({
        title: "שגיאה בעדכון תפקיד",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSetRole = (user: UserProfile) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setIsRoleDialogOpen(true);
  };

  const confirmSetRole = () => {
    if (selectedUser && selectedRole) {
      setRoleMutation.mutate({ userId: selectedUser.id, role: selectedRole });
    }
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "מנהל";
      case "paid":
        return "משלם";
      case "free":
        return "חינמי";
      default:
        return role;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            מנהל
          </Badge>
        );
      case "paid":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            משלם
          </Badge>
        );
      case "free":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            חינמי
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{role}</Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">ניהול משתמשים</h1>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="ml-2 h-4 w-4" />
            רענן רשימה
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : users && users.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>שם מלא</TableHead>
                  <TableHead>אימייל</TableHead>
                  <TableHead>תפקיד</TableHead>
                  <TableHead>תאריך הצטרפות</TableHead>
                  <TableHead className="text-left">פעולות</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name || "לא צוין"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleSetRole(user)}>
                        <UserCheck className="ml-2 h-4 w-4" />
                        שנה תפקיד
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">אין משתמשים במערכת</h3>
            <p className="text-muted-foreground">משתמשים חדשים יוצגו כאן לאחר הרשמה.</p>
          </div>
        )}

        {/* Set Role Dialog */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">שינוי תפקיד משתמש</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">שינוי תפקיד עבור: {selectedUser?.email}</p>
              <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="בחר תפקיד" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">משתמש חינמי</SelectItem>
                  <SelectItem value="paid">משתמש משלם</SelectItem>
                  <SelectItem value="admin">מנהל</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button 
                onClick={confirmSetRole}
                disabled={setRoleMutation.isPending || selectedRole === selectedUser?.role}
              >
                {setRoleMutation.isPending ? "מעדכן..." : "עדכן תפקיד"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">ביטול</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserAdmin;
