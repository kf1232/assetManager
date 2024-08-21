import React, { Suspense, useMemo } from "react"

import { useSelector } from "react-redux"
import { ROLE } from "../../constants/keywords";
import { selectRole } from "../../store/userSlice";

const RoleAdmin = React.lazy(() => import("./RoleAdmin/RoleAdmin"));
const RoleManager = React.lazy(() => import("./RoleManager/RoleManager"));
const RoleUnknown = React.lazy(() => import("./RoleUnknown/RoleUnknown"));
const RoleUser = React.lazy(() => import("./RoleUser/RoleUser"));

const roleView = (role: keyof typeof ROLE): JSX.Element => {
    switch (role) {
        case ROLE.ADMIN:
            return <RoleAdmin />
        case ROLE.MANAGER:
            return <RoleManager />
        case ROLE.USER:
            return <RoleUser />
        default:
            return <RoleUnknown />
    }
}

const Body: React.FC = () => {
    const role = useSelector(selectRole) as "ADMIN" | "MANAGER" | "USER" | "UNKNOWN"

    const view = useMemo(()=> roleView(role), [role])

    return (
        <Suspense fallback={<div> Loading... </div>}>
            {view}
            <div style={{height: '100px'}}></div>
        </Suspense>
    )
}

export default Body
