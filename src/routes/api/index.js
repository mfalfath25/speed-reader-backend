import express from "express"
import { authRoutes } from "../../module/auth/auth.routes"
import { trainingRoutes } from "../../module/training/training.routes"
import { settingRoutes } from "../../module/setting/setting.routes"
import { materialRoutes } from "../../module/material/material.routes"

const apiRoutes = express.Router()

apiRoutes.get("/", function (req, res, next) {
  res.json({ message: "Index API" })
})

apiRoutes.use("/auth", authRoutes)
apiRoutes.use("/training", trainingRoutes)
apiRoutes.use("/setting", settingRoutes)
apiRoutes.use("/material", materialRoutes)

export default apiRoutes
