import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Нет токена, доступ запрещён" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // храним сам объект токена
        req.userId = decoded.id; // храним отдельно id для удобства
        next();
    } catch (error) {
        res.status(401).json({ message: "Неверный или истёкший токен" });
    }
};

// Проверка на администратора
export const requireAdmin = (req, res, next) => {
    try {
        // допустим, мы храним email в токене или сверяем по id
        if (req.user.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: "Доступ запрещён: требуется админ" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Ошибка проверки администратора" });
    }
};
