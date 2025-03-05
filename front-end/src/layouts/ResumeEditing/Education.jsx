import {Input} from '@/components/ui/input';
import {SectionTitle} from './SectionTitle';
import Months from './Months';
import {SectionEditing} from './SectionEditing';
import {MonthDisplayView} from './MonthDisplayView';
import {DEFAULT_RESUME} from '@/lib/DEFAULT_RESUME';

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
                <SectionEditing
                    sectionName={'education'}
                    empty={educationIsEmpty(education)}
                    editingView={
                        <>
                            <div className="mb-4 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                                <div className="sm:flex-grow">
                                    <Input
                                        name="institution"
                                        value={education?.institution || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter institution"
                                        className="times"
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="location"
                                        value={education?.location || ''}
                                        onChange={handleInputChange}
                                        placeholder="City, State"
                                        className="times"
                                    />
                                </div>
                            </div>

                            {/* Additional Fields */}
                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="sm:flex-grow">
                                    <Input
                                        name="degree"
                                        placeholder="Enter Major/Minor"
                                        value={education?.degree || ''}
                                        onChange={handleInputChange}
                                        className="times"
                                    />
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
                                        handleSelectChange={(month) => {
                                            console.log('changing month');
                                            console.log('the new value of month is: ' + month);
                                            updateEducation({
                                                graduationDate: {
                                                    ...education.graduationDate,
                                                    month: month,
                                                },
                                            });
                                        }}
                                    />

                                    <div>
                                        <Input
                                            name="year"
                                            placeholder="Year"
                                            value={education.graduationDate?.year || ''}
                                            onChange={handleYearInputChange}
                                            className="times"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* GPA and Honors */}
                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="w-24">
                                    <Input
                                        name="gpa"
                                        placeholder="Enter GPA"
                                        value={education?.gpa || ''}
                                        onChange={handleInputChange}
                                        className="times"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="w-full">
                                    <Input
                                        name="honors"
                                        placeholder="Enter Honors and Awards"
                                        value={education?.honors || ''}
                                        onChange={handleInputChange}
                                        className="times"
                                    />
                                </div>
                            </div>
                        </>
                    }
                    displayView={
                        <>
                            <div className="mb-4 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                                <div className="sm:flex-grow">
                                    <p className="times">{education?.institution || ''}</p>
                                </div>
                                <div>
                                    <p className="times">{education?.location || ''}</p>
                                </div>
                            </div>

                            {/* Additional Fields */}
                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="sm:flex-grow">
                                    <p className="times">{education?.degree || ''}</p>
                                </div>
                                <div className="flex space-x-4 md:w-1/3">
                                    <MonthDisplayView
                                        monthNumber={education.graduationDate?.month || ''}
                                    />
                                    <div>
                                        <p className="times">
                                            {education.graduationDate?.year || ''}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* GPA and Honors */}
                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="w-24">
                                    <p className="times">{education?.gpa || ''}</p>
                                </div>
                            </div>

                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="w-full">
                                    {/* <p className="times">{education?.honors || ''}</p> */}
                                </div>
                            </div>
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default Education;

function educationIsEmpty(education) {
    // console.log(JSON.stringify(education));
    // console.log(JSON.stringify(DEFAULT_RESUME.education.content));
    const isEmpty = JSON.stringify(education) === JSON.stringify(DEFAULT_RESUME.education.content);
    return isEmpty;
}
