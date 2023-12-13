import LogoutButton from "@/features/LogoutButton"
import ProfileCard from "@/widgets/profileForm/ProfileCard"


const ProfilePage = () => (
    <div className="flex flex-col gap-y-4 items-center h-full ">
        <ProfileCard />
        <LogoutButton/>
    </div>
)

export default ProfilePage