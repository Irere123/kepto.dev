"use client";
import { createCircle } from "@kepto/shared";
import { Button, Input, Label, Modal, Textarea } from "@kepto/ui";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useMutation } from "react-query";

interface HelperProps {
  setShowCreateCircleModal: Dispatch<SetStateAction<boolean>>;
  showCreateCircleModal: boolean;
}

export function CreateCircleModalHelper({
  setShowCreateCircleModal,
  showCreateCircleModal,
}: HelperProps) {
  const { mutateAsync } = useMutation("createCircle", createCircle);
  const { push } = useRouter();

  return (
    <Modal
      setShowModal={setShowCreateCircleModal}
      showModal={showCreateCircleModal}
    >
      <div className="flex flex-col space-y-3 border-b px-4 py-3 pt-6 sm:px-16 justify-center items-center">
        <h3 className="text-lg">Create a dev circle</h3>
        <p className="text-center text-sm text-muted-foreground">
          Create a circle for your community to talk to each other and discuss
          about topics.
        </p>
      </div>
      <Formik<{ name: ""; description: "" }>
        initialValues={{ name: "", description: "" }}
        onSubmit={async (values, { setFieldError }) => {
          const { circle, errors } = await mutateAsync(values);

          if (errors) {
            setFieldError(errors[0].field, errors[0].message);
          }

          if (circle) {
            push(`/circle/${circle.slug}`);
            setShowCreateCircleModal(false);
          }
        }}
      >
        {({ handleSubmit, handleChange, isSubmitting, values, errors }) => (
          <>
            <div className="flex flex-col space-y-3 px-4 py-4">
              <Label>Name</Label>
              <Input
                placeholder="Cirle's name"
                maxLength={60}
                autoComplete="off"
                name="name"
                value={values.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name ? (
                <p className="text-destructive text-sm">{errors.name}</p>
              ) : null}

              <Label>Description</Label>
              <Textarea
                placeholder="About"
                value={values.description}
                onChange={handleChange}
                rows={6}
                name="description"
                maxLength={500}
                autoComplete="off"
              />
            </div>
            <div className="px-4 py-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
            </div>
          </>
        )}
      </Formik>
    </Modal>
  );
}

export function useCreateCircleModal() {
  const [showCreateCircleModal, setShowCreateCircleModal] = useState(false);

  const CreateCircleModal = useCallback(() => {
    return (
      <CreateCircleModalHelper
        showCreateCircleModal={showCreateCircleModal}
        setShowCreateCircleModal={setShowCreateCircleModal}
      />
    );
  }, [showCreateCircleModal, setShowCreateCircleModal]);

  return useMemo(
    () => ({ setShowCreateCircleModal, CreateCircleModal }),
    [setShowCreateCircleModal, CreateCircleModal]
  );
}
