import React, { useState } from "react";
import Axios from "../Axios"
const permissionsData = [
  { label: "Can view transactions", value: "ViewTransactions" },
  { label: "Can view refunds", value: "ViewRefunds" },
  { label: "Can log refunds", value: "LogRefunds" },
  { label: "Can view customers", value: "ViewCustomers" },
  { label: "Can create customers", value: "CreateCustomers" },
  { label: "Can edit customers", value: "EditCustomers" },
  {
    label: "Can blacklist/whitelist customers",
    value: "BlacklistWhitelistCustomers",
  },
  { label: "Can view balances", value: "ViewBalances" },
  { label: "Can fund balance", value: "FundBalance" },
  { label: "Can view settlements", value: "ViewSettlements" },
  { label: "Can view balance history", value: "ViewBalanceHistory" },
  { label: "Can view transfers", value: "ViewTransfers" },
  { label: "Can create transfers", value: "CreateTransfers" },
  {
    label: "Can approve/disapprove transfers",
    value: "ApproveDisapproveTransfers",
  },
];


const CustomAdminActionsModal = ({
    visible,
    onCancel,
    onSubmit,
    selectedPermissions = [],
    onPermissionsChange,
    adminRolesPermissions = [],
    userId,
  }) => {
    const [permissions, setPermissions] = useState(selectedPermissions);
  
    const handlePermissionChange = async (permission) => {
        const isSelected = permissions.includes(permission);
        let updatedPermissions;
    
        // If the permission is already selected, remove it from the permissions list
        if (isSelected) {
            console.log(`Unselecting permission: ${permission}`);
            updatedPermissions = permissions.filter((p) => p !== permission);
        } else {
            // If it is not selected, add it to the permissions list
            updatedPermissions = [...permissions, permission];
        }
    
        setPermissions(updatedPermissions);
        // Call the onPermissionsChange callback with the updated permissions
        onPermissionsChange(updatedPermissions);
    
        // Check if the permission is in adminRolesPermissions
        const isAdminRolePermission = adminRolesPermissions.includes(permission);
        if (isAdminRolePermission) {
            try {
                // Ensure userId is defined before calling the API
                if (userId) {
                    console.log(`Unassigning permission: ${permission} for userId: ${userId}`);
                    await unassignPermissionFromAdmin(userId, permission);
                } else {
                    console.error("Error: userId is not defined");
                }
            } catch (error) {
                throw error 
                // Handle error
            }
        }
    };
    
    
    
      
    
    
      
    
      
  
  const unassignPermissionFromAdmin = async (userId, permission) => {
    try {
        console.log(`Unassigning permission: ${permission} for userId: ${userId}`);
        const response = await Axios.delete(`/unassignRolesFromAdmin/${userId}?permission=${permission}`);
        if (!response.ok) {
            console.log(response);
        }
    } catch (error) {
        throw error 
    }
};

      
  
    return (
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
          visible ? "" : "hidden"
        }`}
      >
        <div className="bg-white overflow-scroll h-[90vh] example md:h-fit p-8 rounded shadow-lg md:w-[70%]">
          <h2 className="text-lg font-semibold mb-4">
            Select Admin Role Permissions
          </h2>
          <div className="space-y-2 flex flex-wrap gap-5">
            {permissionsData.map(({ label, value }) => (
            <div
            key={value}
            className={`cursor-pointer p-4 border ${
              permissions.includes(value)
              ? "bg-orange-200"
              : adminRolesPermissions.includes(value)
              ? "bg-orange-200"
              : "bg-white"
            }`}
            onClick={() => handlePermissionChange(value, userId)}
            >
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-orange-400 text-white px-4 py-2 rounded"
              onClick={() => onSubmit(permissions)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomAdminActionsModal;