export const ApiConstants = {
  TODO: {
    ADD: (userId: number) => {
      return "/todo/" + userId;
    },
    FIND_NOT_COMPLETED: (userId: number) => {
      return "/todo/" + userId;
    },
    FIND_COMPLETED: (userId: number) => {
      return "/todo/findAllCompleted/" + userId;
    },
    MARK_COMPLETE: (todoId: number) => {
      return "/todo/" + todoId;
    },
    DELETE: (todoId: number) => {
      return "/todo/" + todoId;
    },
  },
  USER: {
    FIND_ALL: "admin/users",
    DELETE: (userId: number) => {
      return "/admin/" + userId;
    },
  },
  SIGN_UP: "/auth/signUp",
  LOGIN: "/auth/login",
};
