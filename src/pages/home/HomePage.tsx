import Loader from "@/shared/components/ui/loader";
import { classApi } from "@/shared/store/services/ClassService"

export default function HomePage() {
    const { data, isLoading, error } = classApi.useFetchAllClassesQuery(5);
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