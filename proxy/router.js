const Router = require("express");
const axios = require("axios");

const router = new Router();

const TREE_NAME = "688ead97-e7c4-146c-77af-0a24360b040e";
const API = "https://test.vmarmysh.com";

const callApi = async (res, ...apiRequest) => {
  try {
    const { data } = await axios.post(...apiRequest);
    res.json(data);
  } catch (e) {
    console.log("===e===", e);
    res.status(500).json({ message: e.message });
  }
};

router.post("/get", async (_, res) => {
  callApi(
    res,
    `${API}/api.user.tree.get`,
    {},
    {
      params: {
        treeName: TREE_NAME,
      },
    }
  );
});

router.post("/create", async ({ body }, res) => {
  // try {
  //   const { data } = await axios.post(
  //     `${API}/api.user.tree.node.create`,
  //     {},
  //     {
  //       params: {
  //         ...body,
  //         treeName: TREE_NAME,
  //       },
  //     }
  //   );
  //   return res.json(data);
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({ message: e.message });
  // }
  callApi(
    res,
    `${API}/api.user.tree.node.create`,
    {},
    {
      params: {
        ...body,
        treeName: TREE_NAME,
      },
    }
  );
});

router.post("/rename", async ({ body }, res) => {
  // try {
  //   const { data } = await axios.post(
  //     `${API}/api.user.tree.node.rename`,
  //     {},
  //     {
  //       params: {
  //         ...body,
  //         treeName: TREE_NAME,
  //       },
  //     }
  //   );
  //   return res.json(data);
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({ message: e.message });
  // }
  callApi(
    res,
    `${API}/api.user.tree.node.rename`,
    {},
    {
      params: {
        ...body,
        treeName: TREE_NAME,
      },
    }
  );
});

router.post("/delete", async ({ body }, res) => {
  // try {
  //   const { data } = await axios.post(
  //     `${API}/api.user.tree.node.delete`,
  //     {},
  //     {
  //       params: {
  //         ...body,
  //         treeName: TREE_NAME,
  //       },
  //     }
  //   );
  //   return res.json(data);
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({ message: e.message });
  // }
  callApi(
    res,
    `${API}/api.user.tree.node.delete`,
    {},
    {
      params: {
        ...body,
        treeName: TREE_NAME,
      },
    }
  );
});

module.exports = router;
