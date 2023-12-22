"use client";

import { Button, Modal } from "@kepto/ui";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Downshift from "downshift";

import { Input } from "../input";

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" },
];

function CreateConvModalHelper({
  setShowCreateConvModal,
  showCreateConvModal,
}: {
  showCreateConvModal: boolean;
  setShowCreateConvModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [rawText, setRawText] = useState("");

  return (
    <Modal
      showModal={showCreateConvModal}
      setShowModal={setShowCreateConvModal}
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-primary-accents-3 px-4 py-4 pt-8 sm:px-16">
        <h3 className="text-lg font-medium text-primary-accents-7">
          Create conversation
        </h3>
        <p className="text-center text-sm text-primary-accents-8">
          You can create a conversation with your fellow friends and talk about
          dev stuff
        </p>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <Downshift
          onChange={(selection) =>
            alert(
              selection
                ? `You selected ${selection.value}`
                : "Selection Cleared"
            )
          }
          itemToString={(item) => (item ? item.value : "")}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => (
            <div>
              <div {...getRootProps({}, { suppressRefError: true })}>
                <Input
                  {...getInputProps()}
                  placeholder="somebody@mail.com or @somebody"
                />
              </div>
              <ul {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(
                        (item) => !inputValue || item.value.includes(inputValue)
                      )
                      .map((item, index) => (
                        <li
                          key={index}
                          {...getItemProps({
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? "lightgray"
                                  : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal",
                            },
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
      </div>
      <div className="flex gap-2 p-5">
        <Button
          text="Cancel"
          onClick={() => setShowCreateConvModal(!showCreateConvModal)}
        />
        <Button text="Create" />
      </div>
    </Modal>
  );
}

export function useCreateConvModal() {
  const [showCreateConvModal, setShowCreateConvModal] = useState(false);

  const CreateConvModal = useCallback(() => {
    return (
      <CreateConvModalHelper
        showCreateConvModal={showCreateConvModal}
        setShowCreateConvModal={setShowCreateConvModal}
      />
    );
  }, [showCreateConvModal, setShowCreateConvModal]);

  return useMemo(
    () => ({ setShowCreateConvModal, CreateConvModal }),
    [setShowCreateConvModal, CreateConvModal]
  );
}
