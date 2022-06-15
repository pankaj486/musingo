import React, { useRef, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./ProfileCreationWizard";
import { useContext } from "react";
import SettingPlusIcon from "src/assets/images/settingPlus.png";
import { Spinner } from "reactstrap";
import {useUserMeProfileCreate} from "src/generated/apiFetchers";


export type CreateProfileAvatarFormProps = {
  onNext: () => void;
};


export const CreateProfileAvatarForm: React.FC<
  CreateProfileAvatarFormProps
> = ({ onNext }) => {


  const [blogFile, setblogFile] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [avatarFile, setAvatarFile] = useState<any>(SettingPlusIcon);

  const {mutate: createAvatar} = useUserMeProfileCreate({});

  const user = useContext(UserContext);

  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(null);
      var binaryData = [];
      setImage(event.target.files[0]);
      binaryData.push(event.target.files[0]);
      setblogFile(window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })))
    }
  }

  async function formSubmit() {
    let formData = new FormData();

    formData.append("first_name", user[0][0].firstName);
    formData.append("last_name", user[0][0].lastName);
    // formData.append("about", user.about);
    formData.append("address", "address");
    formData.append("user_type", user[0][2]);
    formData.append("birthday", user[0][0].birthday);
    formData.append("avatar", avatarFile ? avatarFile : image);
    setIsLoading(true);
    await createAvatar(formData as any)
    onNext();
  }
  return (
    <div className="d-flex flex-column  align-items-center text-center p-5 dynamicHeight">
      <div>
        <h2>Profilfoto</h2>
        <p className="pt-3 pt-sm-0 px-4 px-sm-0 medium-font">
          Lade ein Profilfoto als Portrait von dir hoch.
        </p>
      </div>
      <figure
        className="cursor-pointer mt-4 d-flex align-items-center"
        onClick={() => fileInputRef.current?.click()}
      >
        <img
          src={avatarFile ? SettingPlusIcon : blogFile}
          alt="plus"
          width={blogFile === SettingPlusIcon ? "130px" : "100px"}
        />
      </figure>
      <div style={{ width: "80%" }}>
        {isLoading ? <Spinner />:<button
          type="button"
          className="btn btn-secondary btn-block musingoo-button mx-0 mt-4 small-font font-weight-bold"
          onClick={() => formSubmit()}
        >
          Weiter
        </button>}
        <br />
        <button
          className="pt-2 pt-sm-4 text-black-30 btn btn-link"
          onClick={onNext}
        >
          Überspringen
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={"image/*"}
        style={{ display: "none" }}
        onChange={handleUpload}
      />
    </div>
  );
};