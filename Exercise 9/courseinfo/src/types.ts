interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartOne extends CourseDescription {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends CourseDescription {
    name: "Advanced";
    description: string;
}

export interface CoursePartFour extends CourseDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
    description: string
}


export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

