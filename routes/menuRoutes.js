const express = require("express");
const router = express.Router();

const menuItem = require("../Models/Menu");

// GET METHOD FOR MENU ITEM
router.get("/", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("Successfully get the menuItem");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

// POST METHOD FOR MENU ITEM
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenuItem = new menuItem(data);

    const response = await newMenuItem.save();
    console.log("Successfully created menuItem");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

// GET METHOD FOR MENU ITEM Using Parameter
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await menuItem.find({ taste: tasteType });
      console.log("Successfully get the menuItem");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "Invalid tasteType" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedata = req.body;

    const response = await menuItem.findByIdAndUpdate(menuId, updatedata, {
      new: true,
      runValidators: true,
    });
    console.log("menu updated");
    res.status(200).json(response);

    if (!response) {
      res.status(404).json({ Error: "Inavalid menuItem" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

//UPDATE MENUITEM
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updateData = req.body;

    const response = await menuItem.findByIdAndUpdate(menuId, updateData, {
      new: true,
      runValidators: true,
    });
    console.log("menuItem Updated");
    re.status(200).json(response);

    if (!response) {
      res.status(404).json({ Error: "menuItem not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

// DELETE MENUITEM
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await menuItem.findByIdAndDelete(menuId);

    if (!response) {
      res.status(404).json({ Error: "menuItem not  found" });
    } else {
      console.log("menuItem deleted");
      res.status(200).json({ message: "menuItem deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

module.exports = router;
