public with sharing class DocumentChecklistController {
    @AuraEnabled(cacheable=true)
    public static List<Document_Checklist__c> getChecklistRecords(Id opportunityId) {
        return [
            SELECT Id, Name, Status__c, Opportunity__c
            FROM Document_Checklist__c
            WHERE Opportunity__c = :opportunityId
            ORDER BY Name
        ];
    }
}