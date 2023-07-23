// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";
import logoShop from "assets/images/logo-shop.png";
// React examples
import PageLayout from "examples/LayoutContainers/PageLayout";

function CoverLayout({ color, header, title, description, children }) {
  return (
    <PageLayout background="#212121">
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "90vh" }}>
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SoftBox pt={3} px={3}>
            {!header ? (
              <>
                <SoftBox mb={1} sx={{ textAlign: "center" }}>
                  <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
                    {title}
                  </SoftTypography>
                </SoftBox>
                <SoftTypography
                  variant="body2"
                  fontWeight="regular"
                  color="text"
                  sx={{ textAlign: "center" }}
                >
                  {description}
                </SoftTypography>
              </>
            ) : (
              header
            )}
          </SoftBox>
          <SoftBox p={3}>{children}</SoftBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
