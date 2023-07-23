import React from "react";
import SoftBox from "components/SoftBox";
import { Card, Icon, IconButton } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CompleteCategorie from "./components/CompleteCategorie";
import CompleteSubCategorie from "./components/CompleteSubCategorie";
import FormItem from "./components/FormItem";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import CreateImage from "./components/CreateImage";
import { getCategories } from "http/categorieApi";
import { getSubCategorie } from "http/subCategorieApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createCatalog } from "http/catalogApi";
import { createimage } from "http/imageApi";

const CatalogCreate = () => {
  const [itemData, setItemData] = React.useState([]);
  const [info, setInfo] = React.useState([]);
  const queryClient = useQueryClient();

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const { mutate: createImage } = useMutation((formData) => createimage(formData), {
    onSuccess: async (response, formData) => {
      queryClient.invalidateQueries("getCatalogs");
    },
    onError: (error) => {
      console.log(error, "errorerror");
    },
  });

  const { mutate, isError } = useMutation((formData) => createCatalog(formData), {
    onSuccess: async (response, formData) => {
      if (itemData.length !== 0 && response.uuid) {
        itemData.map(async (item) => {
          const imageFormData = new FormData();
          imageFormData.append("catalogUuid", response.uuid);
          imageFormData.append("image", item.file);
          await createImage(imageFormData);
        });
      }
      queryClient.invalidateQueries("getCatalogs");
    },
    onError: (error) => {
      console.log(error, "errorerror");
      // setError(error.response.data.message);
    },
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const name = e.target.name.value;
      const price = e.target.price.value;
      const description = e.target.description.value;
      // const categorie = e.target.categorie.value;
      // const subCategorie = e.target.subCategorie.value;
      const formData = {
        name,
        price: +price,
        description,
        subCategoryUuid: "d9509397-f20a-472d-8010-e19597a06acd",
        categoryUuid: "15bb8025-abc1-45f7-a26a-a8e1ae4e5509",
        info,
      };

      await mutate(formData);
    } catch (e) {
      console.log(e);
    }
  };

  const { isLoading: isLoadingCategories, data: categories } = useQuery("getCategories", () =>
    getCategories()
  );

  const { isLoading: isLoadingSubcategories, data: subcategories } = useQuery("subCategorie", () =>
    getSubCategorie()
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={3}>
              <SoftBox mb={3}>
                <SoftTypography variant="h5" color="info" fontWeight="bold" textGradient>
                  Create Catalog
                </SoftTypography>
              </SoftBox>
              <SoftBox component="form" role="form" onSubmit={handleSubmit} gap={3} pr={5}>
                <SoftBox display="flex" gap={3}>
                  <CreateImage itemData={itemData} setItemData={setItemData} />
                  <SoftBox>
                    <FormItem label="Name" name={"name"} id={"name"} required />
                    <FormItem label="Price" type="number" name={"price"} id={"price"} required />
                    <FormItem
                      label="Description"
                      name={"description"}
                      id={"description"}
                      required
                    />
                    <SoftBox display="flex" gap={5}>
                      <SoftBox display="flex" alignItems="center">
                        <CompleteCategorie
                          id="categorie"
                          required
                          loading={isLoadingCategories}
                          categories={categories?.data}
                        />
                 
                      </SoftBox>
                      <CompleteSubCategorie
                        id="subCategorie"
                        required
                        subcategories={subcategories?.data}
                        isLoading={isLoadingSubcategories}
                      />
                    </SoftBox>
                    <SoftBox py={2}>
                      <SoftButton variant="gradient" color="info" onClick={addInfo}>
                        Добавить новое свойство
                      </SoftButton>
                    </SoftBox>
                    {info.map((i) => (
                      <SoftBox key={i.number} display="flex" alignItems="center" gap={3} my={2}>
                        <SoftBox>
                          <SoftInput
                            required
                            value={i.title}
                            onChange={(e) => changeInfo("title", e.target.value, i.number)}
                            placeholder="Введите название свойства"
                          />
                        </SoftBox>
                        <SoftBox>
                          <SoftInput
                            required
                            value={i.description}
                            onChange={(e) => changeInfo("description", e.target.value, i.number)}
                            placeholder="Введите описание свойства"
                          />
                        </SoftBox>
                        <SoftBox>
                          <SoftButton
                            onClick={() => removeInfo(i.number)}
                            variant="outlined"
                            color="info"
                          >
                            Удалить
                          </SoftButton>
                        </SoftBox>
                      </SoftBox>
                    ))}
                  </SoftBox>
                </SoftBox>
                <SoftBox display="flex" justifyContent="flex-end">
                  <SoftButton type="submit" variant="gradient" color="info">
                    Create
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
};

export default CatalogCreate;
