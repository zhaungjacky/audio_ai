import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { settingStyles } from "../settings/SettingModal";
import { Link } from "react-router-dom";
import RedLine from "../../components/RedLine";
import useFetch from "../../hook/useFetch";

/*
    {
        "id": 1,
        "title": "写出不同的风格",
        "context": "使用述而作以您喜欢的风格撰写摘要。想让它像你最喜欢的作家一样写作吗？它可以。想让它听起来很学术吗？完毕。想要它把你的语音笔记转换成一首美丽的诗吗？勇敢尝试把！",
        "annalPrice": 365
    },
    {
        "id": 2,
        "title": "录制更长的语音笔记",
        "context": "转录和总结长达15分钟的语音笔记（免费用户为 3 分钟）！",
        "annalPrice": 0
    },
    {
        "id": 3,
        "title": "上传音频文件",
        "context": "上传现有的音频文件进行转录和重写。每个会员用户每月可上传 30 次，每次上传最多 25MB。",
        "annalPrice": 0
    },
    {
        "id": 4,
        "title": "下载您的语音笔记",
        "context": "会员用户可以在创建语音笔记后立即下载音频。请注意，音频会在创建后大约一小时从应用程序的服务器中自动删除，因此您只能在创建后、保存笔记之前立即下载它。",
        "annalPrice": 0
    },
    {
        "id": 5,
        "title": "保存无限笔记",
        "context": "免费用户最多可以保存10个笔记。当您升级到会员时，您可以保存任意数量的内容。",
        "annalPrice": 0
    },
    {
        "id": 6,
        "title": "自定义总结文档长度",
        "context": "想要更短、更清晰的摘要吗？或者更长、更详细的内容？作为会员用户，您可以选择。自定义每次生成的每个摘要的长度，以便您获取更多内容并减少编辑次数。",
        "annalPrice": 0
    },
    {
        "id": 7,
        "title": "重写笔记注释",
        "context": "在某处保存了旧的文本注释并希望述而作为您重写它？会员用户专享。",
        "annalPrice": 0
    },
    {
        "id": 8,
        "title": "搜索笔记",
        "context": "简单、有效、搜索。为你所有的笔记。随着笔记数据库的增长很有用。",
        "annalPrice": 0
    },
    {
        "id": 9,
        "title": "暂停录音",
        "context": "想象一下，您正在语音留言中，有人闯入房间。您只需按暂停即可。当您准备好再次出发时，再继续。",
        "annalPrice": 0
    },
    {
        "id": 10,
        "title": "创建超级摘要",
        "context": "合并您创建的多个笔记以创建超级摘要。\r\n如果您对随着时间的推移收集的主题有很多想法，则非常有用。使用此功能撰写深入的文章、博客、电子邮件等。",
        "annalPrice": 0
    },
    {
        "id": 12,
        "title": "重新设置现有笔记的样式",
        "context": "想要编辑之前保存的笔记的样式？或者更改它的语言？\r\n只需简单操作即可完成这两项操作。",
        "annalPrice": 0
    },
    {
        "id": 13,
        "title": "动态选择样式",
        "context": "如果您使用述而作编写不同类型的内容，您会喜欢此功能。\r\n写电子邮件？一篇论文？还是待办事项清单？只需点击记录并说话。完成后，述而作会让你为其输出选择一种书写风格。",
        "annalPrice": 0
    },
    {
        "id": 14,
        "title": "编辑文本",
        "context": "述而作是否在您的成绩单中拼错了名字或发音复杂的术语？作为会员用户，您可以对其进行编辑，然后重新设置摘要的样式。",
        "annalPrice": 0
    },
    {
        "id": 15,
        "title": "保存特殊字词",
        "context": "如果您对语音转录工具拼错您的名字或您经常使用的特定术语感到不满意，会员用您可以将特殊单词保存到述而作，以便它始终正确拼写它们。",
        "annalPrice": 0
    },
    {
        "id": 16,
        "title": "可变重写级别",
        "context": "作为会员用户，您可以要求述而作以您选择的风格和长度重写它。不管您是想要一个简单整理过的文本，还是完全重新的内容！",
        "annalPrice": 0
    },
    {
        "id": 17,
        "title": "为笔记添加标签",
        "context": "为每个笔记创建标签，并为任何笔记分配多个标签。通过这种方式，您可以快速筛选笔记，找到您所需的笔记。",
        "annalPrice": 0
    },
    {
        "id": 18,
        "title": "轻松分享",
        "context": "使用述而作创建笔记，并将其内容转发至微信朋友圈、微博等消息共享，只需点击几下即可完成所有操作。",
        "annalPrice": 0
    }
*/

interface PrimePageData {
  id: number;
  title: string;
  context: string;
  annalPrice: number;
  imagesPath: string;
  cssStyles?: string;
}

const PrimePage = () => {
  const { data } = useFetch<PrimePageData[]>("/api/primepage-content/", false);
  const [initData, setInitData] = React.useState<PrimePageData[]>();
  
  React.useEffect(() => {
    if (data) {
      setInitData(data);
    }
  }, [data]);

  if(!initData) return <>Loading...</>
  return (
    <Box
      sx={{
        height: "100%",
        background: settingStyles.background_main,
        paddingTop: "40px",
      }}
    >
      {/* logo click navigator to main page */}
      <Box sx={{ textAlign: "center" }}>
        <Link to="/">
          <IconButton>
            <MicRoundedIcon
              fontSize="large"
              sx={{
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "5px",
                marginBottom: "10px",
                scale: "2.3",
              }}
            />
          </IconButton>
        </Link>
      </Box>

      {/* header line  */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontSize: { md: "2.5rem", xs: "1.5rem" },
            margin: "20px auto",
            textAlign: "center",
          }}
        >
          述而作会员
        </Typography>
      </Box>

      {/* content-one */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            fontSize: { md: "1.5rem", xs: "1rem" },
            width: "80%",
            margin: "20px auto",
            textAlign: "center",
          }}
        >
          当您尝试了述而作后（如果您喜欢这种风格），是否考虑升级到述而作会员？{" "}
        </Typography>
      </Box>
      {/* content-two */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            fontSize: { md: "1.5rem", xs: "1rem" },
            width: "60%",
            margin: "20px auto",
            textAlign: "center",
          }}
        >
          它拥有述而作所拥有的一切，甚至更多，多很多。
        </Typography>
      </Box>
      {/* reserve for video iframe */}
      <Box></Box>

      {/* annal ticket */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: { md: "50%", xs: "90%" },
            background: settingStyles.background_layer02,
            display: "block",
            // margin:"10px auto",
            // justifyContent: "center",
            color: "white",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              background: settingStyles.background_layer03,
              maxWidth: "20%",
              display: "block",
              margin: "25px auto 10px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            年票
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "monospace,sans-serif", textAlign: "center" }}
          >
            ￥{initData[0].annalPrice}
          </Typography>
          <Typography variant="body1" sx={{ margin: "16px auto" }}>
            使用述而作1年
          </Typography>

          <RedLine width="10%" height="5px" background="red" />

          <Typography variant="body1" sx={{ margin: "16px auto" }}>
            您只会被收取一次费用
          </Typography>
          <Typography variant="body1" sx={{ margin: "16px 20px" }}>
            年底时，您可以选择手动续订，也可以不选择。您在成为会员期间保存的所有笔记仍将由您保留。
          </Typography>
          <Link to="/purchase">
            <Button
              variant="text"
              size="large"
              sx={{
                border: "1px solid white",
                borderRadius: "15px",
                color: "white",
                width: "30%",
              }}
            >
              获取年票
            </Button>
          </Link>
          <Typography variant="body1" sx={{ margin: "16px 20px" }}>
            欢迎尝试
          </Typography>
        </Paper>
      </Box>
      <Box sx={{ margin: "50px auto" }}>
        <RedLine width="15%" height="5px" background="red" />
      </Box>

      <Box>
        <Typography
          variant="h5"
          sx={{ margin: "16px 20px", color: "white", textAlign: "center" }}
        >
          二十一条专属福利
        </Typography>
      </Box>

      <Box
      // sx={{
      //   display: "grid",
      //   columnGap: "30px",
      //   gridAutoRows: "max-content",
      //   gridTemplateColumns: "repeact(auto-fill,minmax(280px,1fr))",
      //   gridAutoFlow: "row",
      //   alignSelf: "center",
      //   minWidth: "0",
      //   minHeight: "200px",
      //   height: "max-content",
      //   flexGrow: "0",
      //   flexShrink: "0",
      //   width: "calc(100%-0px)",
      //   margin: "10px 0 60px 0",
      //   zIndex: 4,
      // }}
      >
        <Grid container spacing={1}>



          {/* no5 保存无限笔记 */}

          {
            initData.map((item,index)=>(
              <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
              <Paper
                elevation={3}
                sx={{
                  background: settingStyles.background_layer01,
                  width: "90%",
                  borderRadius: "20px",
                  margin: "10px auto",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      minHeight: "160px",
                      // background: "red",
                      color: "white",
                      margin: "20px auto 15px",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "8px",
                      backgroundImage: `url(/static/images/${item.imagesPath})`,
                      backgroundRepeat: "round",
                    }}
                  >
                  </Box>
                  <Box
                    sx={{
                      color: "white",
                      margin: "10px 16px 20px",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "8px",
                    }}
                  >
                    <Typography variant="h6">{item.title}</Typography>
                    <Box sx={{ margin: "10px auto" }}>
                      <RedLine width="50px" height="5px" background="red" />
                    </Box>
                    <Typography variant="body1" sx={{ letterSpacing: "1.1px" }}>
                      {item.context}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            ))
          }



        </Grid>

      </Box>
    </Box>
  );
};

export default PrimePage;

/*

*/
