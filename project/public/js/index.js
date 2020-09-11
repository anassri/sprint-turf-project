import { getUserAcccess } from "./projects.js"

(async () => {
    try {
        // console.log('I got here');
        const res = await fetch("/projects-data", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "SPRINT_TURF_ACCESS_TOKEN"
                )}`,
            }
        });
        if (res.status === 401) {
            window.location.href = "/users/login";
            return;
        }
        
        getUserAcccess(res);
        
    } catch (e) {
        console.error(e);
    }
})();
