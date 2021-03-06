import SkillField = Shadowrun.SkillField;
import { Helpers } from '../helpers';
import SR5SheetFilters = Shadowrun.SR5SheetFilters;

export const registerSkillLineHelpers = () => {
    Handlebars.registerHelper('SkillHeaderIcons', function (id) {
        const addIcon = {
            icon: 'fas fa-plus',
            title: game.i18n.localize('SR5.AddSkill'),
            text: game.i18n.localize('SR5.Add'),
            cssClass: '',
        };
        switch (id) {
            case 'active':
                return [{}];
            case 'language':
                addIcon.cssClass = 'add-language';
                return [addIcon];
            case 'knowledge':
                addIcon.cssClass = 'add-knowledge';
                return [addIcon];
            default:
                return [];
        }
    });

    Handlebars.registerHelper('SkillHeaderRightSide', function (id, filters: SR5SheetFilters) {
        const specs = {
            text: {
                text: game.i18n.localize('SR5.Specialization'),
                cssClass: 'skill-spec-item',
            },
        };

        const rtg = {
            // Change Rating header to show active filtering.
            text: {
                text: !filters || filters.showUntrainedSkills ?
                    game.i18n.localize('SR5.Rtg') :
                    game.i18n.localize('SR5.RtgAboveZero'),
                cssClass: 'rtg',
            },
        };

        switch (id) {
            case 'active':
            case 'knowledge':
            case 'language':
                return [specs, rtg];
            default:
                return [];
        }
    });
    Handlebars.registerHelper('SkillRightSide', function (skillType: string, skill: SkillField) {
        const specs = Array.isArray(skill.specs) ? skill.specs : [skill.specs];
        return [
            {
                text: {
                    text: specs.join(', ') ?? '',
                    cssClass: 'skill-spec-item',
                },
            },
            {
                text: {
                    text: Helpers.calcTotal(skill),
                    cssClass: 'rtg',
                },
            },
        ];
    });

    Handlebars.registerHelper('SkillIcons', function (skillType: string, skill: SkillField) {
        const editIcon = {
            icon: 'fas fa-edit',
            title: game.i18n.localize('SR5.EditSkill'),
            cssClass: '',
        };
        const removeIcon = {
            icon: 'fas fa-trash',
            title: game.i18n.localize('SR5.DeleteSkill'),
            cssClass: '',
        };

        //@ts-ignore
        // Allow both true and undefined to be valid
        const allowEdit = skill.editable !== false;

        switch (skillType) {
            case 'active':
                //@ts-ignore
                editIcon.cssClass = allowEdit ? 'skill-edit' : '';
                editIcon.icon = allowEdit ? editIcon.icon : 'fas';
                return [editIcon];
            case 'language':
                editIcon.cssClass = allowEdit ? 'language-skill-edit' : '';
                removeIcon.cssClass = 'remove-language';
                return [editIcon, removeIcon];
            case 'knowledge':
                editIcon.cssClass = allowEdit ? 'knowledge-skill-edit' : '';
                removeIcon.cssClass = 'remove-knowledge';
                return [editIcon, removeIcon];
            default:
                return [editIcon];
        }
    });

};
