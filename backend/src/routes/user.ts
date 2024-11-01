import { Router } from "express";
import { User } from "../models/User";

const router = Router();

router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

router.put("/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(user);
});

router.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

export default router;
