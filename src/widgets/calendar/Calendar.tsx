import ClassBlock from "@/entities/class/components/ClassBlock";
import { getWeekday } from "@/entities/class/helpers/getWeekday";
import { Weekday } from "@/entities/class/models/Weekday";
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
            <div className="p-4 flex flex-row gap-x-4 justify-between">
                {Object.values(Weekday).map(weekday => (
                    <div key={weekday} className="flex flex-col gap-y-4 p-2">
                        <h1>{getWeekday(weekday)}</h1>
                        <div>
                            {data.filter(schoolClass => schoolClass.weekday === weekday).map((schoolClass) => (
                                <ClassBlock key={schoolClass.id} classData={schoolClass} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Calendar