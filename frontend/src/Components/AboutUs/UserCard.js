import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import userw from "../../Assest/userw.png";
import "./UserCard.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserCard({ name, workType }) {
  // Modified to accept 'name' prop
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="card-container" align="center" sx={{ maxWidth: 320 }}>
      <div className="img-container">
        <CardMedia
          className="cardMedia"
          component="img"
          image={userw}
          alt="person"
        />
      </div>
      <CardHeader class="cardHeader" title={name} />
      <CardContent className="cardContent">
        <Typography variant="body1">{workType}</Typography>
      </CardContent>
      <CardActions className="cardActions" disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "white" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="quoted-text">
          <Typography variant="body2" paragraph color={"white"}>
            "I like to do my work."
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
