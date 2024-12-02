import { Link, useParams, useLocation } from "react-router-dom";
import { courses } from "../Database";

export default function CoursesNavigation() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === cid);

    const links = [
        { label: "Home", path: `/Kanbas/Courses/${cid}/Home` },
        { label: "Modules", path: `/Kanbas/Courses/${cid}/Modules` },
        { label: "Piazza", path: `/Kanbas/Courses/${cid}/Piazza` },
        { label: "Zoom", path: `/Kanbas/Courses/${cid}/Zoom` },
        { label: "Assignments", path: `/Kanbas/Courses/${cid}/Assignments` },
        { label: "Quizzes", path: `/Kanbas/Courses/${cid}/Quizzes` },
        { label: "Grades", path: `/Kanbas/Courses/${cid}/Grades` },
        { label: "People", path: `/Kanbas/Courses/${cid}/People` }
    ];

    return (
        <div className="list-group fs-5 rounded-0" id="wd-courses-navigation">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`list-group-item text-decoration-none border-0 ${
                        pathname.includes(link.path) ? "bg-danger text-white" : "text-danger bg-white"
                    }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}

