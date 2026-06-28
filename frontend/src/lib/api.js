const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getSubmissionsByFormId = async (formId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/submissions/${formId}`);

        if (!response.ok) throw new Error("Failed to fetch submissions");
        
        return await response.json();
    } catch (error) {
        console.error("API Error: ", error);
        return [];
    }
};

export const getForms = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/forms`);
        if (!response.ok) throw new Error("Failed to fetch forms");

        return await response.json();
    } catch (error) {
        console.error("API Error: ", error)
    }
}

export const createForm = async ({ name, description }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/createForm`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        });

        if (!response.ok) throw new Error("Failed to create new form");

        return await response.json();
    } catch (error) {
        console.error("Failed to create form", error);
    }
}
