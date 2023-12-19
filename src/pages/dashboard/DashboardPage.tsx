import CreateClassForm from "@/widgets/createClassForm/CreateClassForm"
import CreateGroupForm from "@/widgets/createGroupForm/CreateGroupForm"
import CreateSubjectForm from "@/widgets/createSubjectForm/CreateSubjectForm"

const DashboardPage = () => {
  return (
    <div className="items-center flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-center">
      <CreateClassForm />
      <CreateSubjectForm />
      <CreateGroupForm />
    </div>
  )
}

export default DashboardPage