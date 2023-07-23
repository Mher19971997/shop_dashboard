import React from "react";
import PropTypes from "prop-types";
import { Autocomplete, Icon, IconButton, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftModal from "components/SoftModal";
import SoftButton from "components/SoftButton";
import FormItem from "../FormItem";
import { useMutation, useQueryClient } from "react-query";
import { createCategories } from "http/categorieApi";

const CompleteCategorie = ({ id, categories, loading }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const defaultProps = {
    options: categories,
    getOptionLabel: (option) => option.name,
  };
  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation((formData) => createCategories(formData), {
    onSuccess: async (response, formData) => {
      queryClient.invalidateQueries("getCategories");
      setOpen(false);
    },
    onError: (error) => {
      console.log(error, "errorerror");
      // setError(error.response.data.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categorie = e.target.categorie.value;
      const formData = { name: categorie };
      console.log(categorie,"subcategoriesubcategorie");
      await mutate(formData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SoftBox>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography
          component="h3"
          variant="caption"
          color="info"
          fontWeight="bold"
          textGradient
        >
          Categorie
        </SoftTypography>
      </SoftBox>
      <SoftBox display="flex" alignItems="center" gap={1.5}>
        <Autocomplete
          required
          {...defaultProps}
          id={id}
          loading={loading}
          disableCloseOnSelect
          renderInput={(params) => <TextField required {...params} />}
        />
        <IconButton
          onClick={handleOpen}
          sx={({ palette: { white, dark } }) => ({
            width: "24px",
            height: "24px",
            color: "white",
            padding: 0,
            borderColor: dark.main,
            backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
              linearGradient(gradients["info"].main, gradients["info"].state),

            "&:not(:last-child)": {
              mr: 1,
            },
          })}
        >
          <Icon>add</Icon>
        </IconButton>
        <SoftModal title="Create Categorie" open={open} handleClose={handleClose} width="20%">
          <SoftBox
            component="form"
            display="flex"
            flexDirection="column"
            gap={1.5}
            role="form"
            onSubmit={handleSubmit}
          >
            <FormItem label="Categorie" type="text" name={"categorie"} id={"categorie"} required />
            <SoftBox display="flex" justifyContent="flex-end">
              <SoftButton type="submit" variant="gradient" color="info">
                Create
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftModal>
      </SoftBox>
    </SoftBox>
  );
};

CompleteCategorie.propTypes = {
  id: PropTypes.string,
  categories: PropTypes.array,
  loading: PropTypes.bool,
};

export default CompleteCategorie;
