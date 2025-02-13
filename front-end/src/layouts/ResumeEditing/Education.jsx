import {Input} from '@/components/ui/input';
import {SectionTitle} from './SectionTitle';
import Months from './Months';

const Education = ({updateEducation, education}) => {
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        updateEducation({[name]: value});
    };

    const handleYearInputChange = (e) => {
        const {value} = e.target;
        updateEducation({
            graduationDate: {
                ...education.graduationDate,
                year: value,
            },
        });
    };

    return (
        <div className="mt-4">
            <div className="w-full">
                <SectionTitle title="Education" />
                {/* Combined Row for Institution, Location */}
                <div className="mb-4 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <div className="sm:flex-grow">
                        <Input name="institution" value={education?.institution || ''} onChange={handleInputChange} placeholder="Enter institution" className="times" />
                    </div>
                    <div>
                        <Input name="location" value={education?.location || ''} onChange={handleInputChange} placeholder="City, State" className="times" />
                    </div>
                </div>

                {/* Additional Fields */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="sm:flex-grow">
                        <Input name="degree" placeholder="Enter Major/Minor" value={education?.degree || ''} onChange={handleInputChange} className="times" />
                    </div>

                    <div className="flex space-x-4 md:w-1/3">
                        <Months
                            type="Graduation"
                            value={education.graduationDate?.month || ''}
                            updateComponent={(month) =>
                                updateEducation({
                                    graduationDate: {
                                        ...education.graduationDate,
                                        month: month,
                                    },
                                })
                            }
                        />

                        <div>
                            <Input name="year" placeholder="Year" value={education.graduationDate?.year || ''} onChange={handleYearInputChange} className="times" />
                        </div>
                    </div>
                </div>

                {/* GPA and Honors */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-24">
                        <Input name="gpa" placeholder="Enter GPA" value={education?.gpa || ''} onChange={handleInputChange} className="times" />
                    </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-full">
                        <Input name="honors" placeholder="Enter Honors and Awards" value={education?.honors || ''} onChange={handleInputChange} className="times" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;
