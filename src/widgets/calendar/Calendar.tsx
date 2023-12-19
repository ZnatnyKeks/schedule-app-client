import Loader from "@/shared/components/ui/loader";
import { useAppSelector } from "@/shared/store/hooks";
import { classApi } from "@/shared/store/services/ClassService";

const Calendar = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const { data, isLoading, error } = classApi.useFetchAllClassesQuery(user.id);
    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <h1>Error with classes fetching</h1>
    }
    if (data) {
        return (
            <div>
                {data.map((schoolClass) => (
                    <div key={schoolClass.id}>
                        {schoolClass.weekday}
                        {schoolClass.hour}
                    </div>
                ))}
            </div>
        )
    }
}

export default Calendar