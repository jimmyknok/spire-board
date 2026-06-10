# 尖塔决策室

一个中文《杀戮之塔 / Slay the Spire》攻略站 v1。重点不是复制百科资料，而是把角色、章节、血量、卡组缺口、路线压力和奖励卡放进同一个局内决策界面。

## 本地预览

直接打开 `index.html` 即可。也可以启动一个静态服务器：

```bash
python3 -m http.server 8765
```

然后访问 `http://127.0.0.1:8765/`。

## 自动上线

仓库已经包含 GitHub Pages 工作流：`.github/workflows/pages.yml`。

第一次上线步骤：

1. 在 GitHub 新建一个空仓库。
2. 把本目录初始化为 Git 仓库并推送到 GitHub。
3. 进入 GitHub 仓库的 `Settings -> Pages`，Source 选择 `GitHub Actions`。
4. 以后每次推送到 `main` 分支都会自动发布。

如果你已经登录 GitHub CLI，也可以后续改成一条命令创建仓库并推送；当前机器没有安装 `gh`，所以这里先采用最稳的 Pages 工作流。

## 数据扩展方向

- 补全四职业全量卡牌与升级字段。
- 增加遗物、药水、事件、Boss、精英与常见敌人测试题。
- 为每条建议记录版本号、来源、适用进阶与反例。
- 增加玩家自定义卡组导入和 run history 复盘。
