import DashboardController from './DashboardController'
import LogOffController from './LogOffController'
import UserController from './UserController'
import UserRoleController from './UserRoleController'
import PsgcController from './PsgcController'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
LogOffController: Object.assign(LogOffController, LogOffController),
UserController: Object.assign(UserController, UserController),
UserRoleController: Object.assign(UserRoleController, UserRoleController),
PsgcController: Object.assign(PsgcController, PsgcController),
}

export default Controllers