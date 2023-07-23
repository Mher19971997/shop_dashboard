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
import { createSubCategorie } from "http/subCategorieApi";

const CompleteSubCategorie = ({ id, subcategories }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const defaultProps = {
    options: subcategories,
    getOptionLabel: (option) => option.name,
  };
  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation((formData) => createSubCategorie(formData), {
    onSuccess: async (response, formData) => {
      queryClient.invalidateQueries("subCategorie");
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
      const subcategorie = e.target.subcategorie.value;
      const formData = { name: subcategorie };
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
          Sub Categorie
        </SoftTypography>
      </SoftBox>
      <SoftBox display="flex" alignItems="center" gap={1.5}>
        <Autocomplete
          {...defaultProps}
          id={id}
          required
          loading
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
        <SoftModal title="Create Sub Categorie" open={open} handleClose={handleClose} width="20%">
          <SoftBox
            component="form"
            display="flex"
            flexDirection="column"
            gap={1.5}
            role="form"
            onSubmit={handleSubmit}
          >
            <FormItem
              label="Sub Categorie"
              type="text"
              name={"subcategorie"}
              id={"subcategorie"}
              required
            />
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

CompleteSubCategorie.propTypes = {
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  subcategories: PropTypes.array,
};

export default CompleteSubCategorie;
