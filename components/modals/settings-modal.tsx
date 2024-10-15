import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "../forms/profile-form";
import { User } from "@prisma/client";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export const SettingsModal = ({ open, onClose, user }: SettingsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Make changes to your account here.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Payment methods</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileForm user={user} />
          </TabsContent>
          <TabsContent value="billing">Manage your payment methods here.</TabsContent>
          <TabsContent value="subscription">Manage your subscription here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
