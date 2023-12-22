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
import { useDebounce } from "use-debounce";
import { useQuery } from "react-query";
import { searchUser } from "~/graphql/user";
import usePageVisibility from "~/hooks/usePageVisibility";
import { Text } from "../text";

function CreateConvModalHelper({
  setShowCreateConvModal,
  showCreateConvModal,
}: {
  showCreateConvModal: boolean;
  setShowCreateConvModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [rawText, setRawText] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const visible = usePageVisibility();
  const [text] = useDebounce(rawText, 200);
  let enabled = false;

  const isUsernameSearch = text.startsWith("@");

  if (text && isUsernameSearch && text.trim().length > 2) {
    enabled = true;
  }
  if (text && !isUsernameSearch && text.trim().length > 1) {
    enabled = true;
  }

  const { data } = useQuery("searchUser", () => searchUser(text), {
    enabled,
  });

  const results = data ? [...data] : [];

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
          onChange={(selection) => {
            if (!selection) {
              return;
            }

            if ("username" in selection) {
              setSelectedItem(selection);
            }

            console.log(selectedItem);
          }}
          onInputValueChange={(v) => {
            if (visible) {
              setRawText(v);
            }
          }}
          itemToString={(item) => {
            if (!item) {
              return "";
            }
            return item.username;
          }}
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
                  value={rawText}
                  placeholder="somebody@mail.com or @somebody"
                />
              </div>
              <ul {...getMenuProps()}>
                {(data?.length === 0 && data?.length === 0) || !data
                  ? null
                  : null}

                {isOpen
                  ? results
                      .filter(
                        (item) =>
                          !inputValue || item.username.includes(inputValue)
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
                          {item.username}
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
