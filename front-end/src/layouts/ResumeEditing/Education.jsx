import {Input} from '@/components/ui/input';
import {SectionTitle} from './SectionTitle';
import Months from './Months';
import {EditOnClick} from '../../components/EditOnClick';
import {MonthDisplayView} from './MonthDisplayView';
import {DEFAULT_RESUME} from '@/lib/DEFAULT_RESUME';

const Education = ({updateEducation, education}) => {
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        updateEducation({[name]: value});
    };

    // Handle selection changes for dates
    const handleSelectChange = (dateType, field, value) => {
        updateEducation({
            ...education,
            [dateType]: {
                ...education[dateType],
                [field]: value,
            },
        });
    };

    return (
        <div className="mt-4">
            <div className="w-full">
                <SectionTitle title="Education" />
                {/* Combined Row for Institution, Location */}
                <EditOnClick
                    sectionName={'education'}
                    empty={educationIsEmpty(education)}
                    editingView={
                        <div className="times flex w-full flex-col gap-2">
                            <div className="text-md grid grid-cols-3 justify-between gap-2 font-bold">
                                <Input
                                    name="institution"
                                    value={education?.institution || ''}
                                    onChange={handleInputChange}
                                    placeholder="Enter institution"
                                    className="col-span-2"
                                />
                                <Input
                                    name="location"
                                    value={education?.location || ''}
                                    onChange={handleInputChange}
                                    placeholder="City, State"
                                    className="col-span-1 text-right"
                                />
                            </div>

                            <div className="grid grid-cols-8 gap-2 italic">
                                <Input
                                    name="degree"
                                    placeholder="Enter Degree"
                                    value={education?.degree || ''}
                                    onChange={handleInputChange}
                                    className="col-span-6"
                                />
                                <Months
                                    type="Graduation"
                                    value={education.graduationDate?.month || ''}
                                    handleSelectChange={(value) => handleSelectChange('graduationDate', 'month', value)}
                                    className="col-span-1"
                                />
                                <Input
                                    name="year"
                                    placeholder="Year"
                                    value={education.graduationDate?.year || ''}
                                    onChange={(e) => handleSelectChange('graduationDate', 'year', Number(e.target.value))}
                                    className="col-span-1"
                                />
                            </div>

                            {/* GPA and Honors */}
                            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="w-24">
                                    <Input
                                        name="gpa"
                                        placeholder="Enter GPA"
                                        value={education?.gpa || ''}
                                        onChange={handleInputChange}
                                        className=""
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
                                        className=""
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    displayView={
                        <div className="times">
                            <div className="text-md mt-3 flex flex-row justify-between font-bold">
                                <p>{education?.institution || ''}</p>
                                <p>{education?.location || ''}</p>
                            </div>

                            <div className="flex flex-row items-center justify-between italic">
                                <p>{education?.degree || ''}</p>
                                <div className="flex items-center">
                                    <MonthDisplayView
                                        monthNumber={education.graduationDate?.month || ''}
                                    />
                                    <p className="times">{education.graduationDate?.year || ''}</p>
                                </div>
                            </div>

                            {/* GPA and Honors */}
                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className={'w-24'}>
                                    <p className="font-bold">
                                        {education?.gpa == 0 ? '' : 'GPA: ' + education?.gpa}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <div className="w-full">
                                    {/* <p className="times">{education?.honors || ''}</p> */}
                                </div>
                            </div>
                        </div>
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
