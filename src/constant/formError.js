// validationMessages.js

const validationMessages = {
    // Common messages
    REQUIRED_FIELD: "This field is required.",
    INVALID_INPUT: "The input provided is invalid.",
    MIN_LENGTH: "The input is too short.",
    MAX_LENGTH: "The input is too long.",
    PATTERN_MISMATCH: "The input does not match the required pattern.",
    SELECT_OPTION: "Please select an option.",

    // Specific field messages
    FIRST_NAME_REQUIRED: "Please enter your first name.",
    FIRST_NAME_PATTERN: "First name should only contain letters.",

    LAST_NAME_REQUIRED: "Please enter your last name.",
    LAST_NAME_PATTERN: "Last name should only contain letters.",

    EMAIL_REQUIRED: "Please enter your email address.",
    EMAIL_PATTERN: "Please enter a valid email address.",

    PASSWORD_REQUIRED: "Please enter a password.",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long.",

    PROJECT_NAME_REQUIRED: "Please select a project name.",

    PROJECT_SUPERVISOR_REQUIRED: "Please select a project supervisor.",

    SUBJECT_REQUIRED: "Please enter the subject.",
    SUBJECT_PATTERN: "Subject must be a number.",

    ISSUE_DATE_REQUIRED: "Please select the issue date.",

    REFERENCE_REQUIRED: "Please enter the reference.",

    TEMPERATURE_WEATHER_REQUIRED: "Please enter temperature and weather details.",

    WORKER_NAME_REQUIRED: "Please select a worker name.",

    DESIGNATION_REQUIRED: "Please select a designation.",

    TASK_NAME_REQUIRED: "Please enter the task name.",

    EQUIPMENT_USED_REQUIRED: "Please enter the equipment used.",

    STATUS_REQUIRED: "Please select a status.",

    DATE_COMPLETED_REQUIRED: "Please select the completion date.",

    PROGRESS_REQUIRED: "Please indicate the progress."
};

export default validationMessages;
